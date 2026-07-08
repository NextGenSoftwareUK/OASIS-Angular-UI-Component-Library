import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-star-field',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #canvas class="star-canvas"></canvas>`,
  styles: [`
    :host { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
    .star-canvas { width: 100%; height: 100%; display: block; }
  `]
})
export class StarFieldComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private animId = 0;
  private stars: { x: number; y: number; r: number; o: number; s: number }[] = [];

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 160; i++) {
      this.stars.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.2 + 0.2, o: Math.random(), s: (Math.random() - 0.5) * 0.002 });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of this.stars) {
        s.o += s.s;
        if (s.o < 0.1 || s.o > 1) s.s = -s.s;
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${s.o.toFixed(2)})`;
        ctx.fill();
      }
      this.animId = requestAnimationFrame(draw);
    };
    draw();
  }

  ngOnDestroy(): void { cancelAnimationFrame(this.animId); }
}
