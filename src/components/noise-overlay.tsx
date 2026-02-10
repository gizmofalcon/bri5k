"use client";

import { useEffect, useRef } from "react";

export function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 px = gl_FragCoord.xy;

        // --- CRT scan lines ---
        // Horizontal lines that scroll slowly
        float scanSpeed = u_time * 8.0;
        float scanLine = sin((px.y + scanSpeed) * 1.8) * 0.5 + 0.5;
        scanLine = smoothstep(0.3, 0.7, scanLine);
        float scanAlpha = scanLine * 0.045;

        // Finer secondary scan lines (static, tighter)
        float fineLine = sin(px.y * 3.1416) * 0.5 + 0.5;
        fineLine = step(0.92, fineLine);
        float fineAlpha = fineLine * 0.03;

        // --- Film grain noise ---
        float grain = hash(px + u_time * 1000.0);
        float grainAlpha = step(0.94, grain) * 0.06;

        // --- Vignette darkening at edges ---
        vec2 vig = uv * (1.0 - uv);
        float vignette = vig.x * vig.y * 15.0;
        vignette = clamp(pow(vignette, 0.25), 0.0, 1.0);
        float vigDarken = (1.0 - vignette) * 0.08;

        // Combine: cream-colored noise + scan lines, dark vignette
        float bright = scanAlpha + fineAlpha + grainAlpha;
        // Cream color (0.96, 0.94, 0.88)
        vec3 cream = vec3(0.96, 0.94, 0.88);
        vec3 col = cream * bright - vec3(vigDarken);

        float alpha = bright + vigDarken;
        gl_FragColor = vec4(col, alpha);
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "a_position");
    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl!.viewport(0, 0, canvas.width, canvas.height);
    }

    resize();
    window.addEventListener("resize", resize);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    function render(time: number) {
      if (!gl || !canvas) return;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.enableVertexAttribArray(posLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, time * 0.001);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animFrameRef.current = requestAnimationFrame(render);
    }

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden="true"
    />
  );
}
