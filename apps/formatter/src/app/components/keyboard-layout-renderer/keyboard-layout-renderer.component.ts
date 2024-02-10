import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'keyboard-helper-keyboard-layout-renderer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keyboard-layout-renderer.component.html',
  styleUrl: './keyboard-layout-renderer.component.scss',
})
export class KeyboardLayoutRendererComponent {
  @Input()
  keys?: {
    width: number;
    height: number;
    x: number;
    y: number;
    color: string;
    labels: string[];
  }[];

  @ViewChild('svgRenderer')
  svgRenderer?: ElementRef;

  ngAfterViewChecked(): void {
    // resize svg to fit content after initial draw
    if (!this.svgRenderer) return;
    const svg = this.svgRenderer?.nativeElement;
    const bb = svg.getBBox();
    svg.setAttribute('width', bb.width + 10);
    svg.setAttribute('height', bb.height + 10);
    console.log(bb);
  }

  secondaryColor(color: string): string {
    return color;
    // const tcolor = tc(color);
    // if (tcolor.isDark()) {
    //   return tc(color).lighten(10).toHex8String();
    // } else {
    //   return tc(color).darken(10).toHex8String();
    // }
  }
}
