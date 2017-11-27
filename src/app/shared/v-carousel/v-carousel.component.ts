import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'v-carousel',
  templateUrl: './v-carousel.component.html',
  styleUrls: ['./v-carousel.component.scss']
})
export class VCarouselComponent implements AfterViewInit, OnDestroy {
  data: any[] = [
    {
      id: 1, url: 'http://i.imgur.com/njcLNVE.jpg',color:'#99cc33', title: '麻婆豆腐', description: '店家推荐指数：★★★★★', link: '详情点击'
    },
    {
      id: 2, url: 'http://i.imgur.com/3pu2X8D.jpg', color:'#66cccc',title: '宫廷桂鱼', description: '店家推荐指数：★★★★★', link: '详情点击'
    },
    {
      id: 3, url: 'http://i.imgur.com/YAdjqmQ.jpg', color:'#ccffff', title: '宫保鸡丁', description: '店家推荐指数：★★★☆☆', link: '详情点击'
    },
    {
      id: 4, url: 'http://i.imgur.com/njcLNVE.jpg', color:'#ffcccc', title: '鲤鱼跃龙门', description: '店家推荐指数：★★★☆☆', link: '详情点击'
    }
  ];
  currentIndex: number = 0;
  autoSlideTimeout: any;
  diff: number = 0;
  animating: boolean;
  animateTime: number = 5000;
  sliderTranslate: number = 0;
  sliderBgTranslate: number = 0;
  constructor() { }
  ngOnDestroy() {
    clearInterval(this.autoSlideTimeout);
  }

  ngAfterViewInit() {
    this.autoPlay();
    if (this.isMobile()) {
      document.getElementById('container').addEventListener('touchstart', (event: any) => {
        if (this.animating) return;
        window.clearTimeout(this.autoSlideTimeout);
        let startX = event.pageX || event.changedTouches[0].pageX,
          winW = window.innerWidth;
        this.diff = 0;
        document.getElementById('container').addEventListener('touchmove', (e: any) => {
          let x = e.pageX || e.changedTouches[0].pageX;
          this.diff = (startX - x) / winW * 70;
          if ((!this.currentIndex && this.diff < 0) || (this.currentIndex === this.data.length - 1 && this.diff > 0)) {
            this.diff /= 2;
          }
          this.sliderTranslate = -this.currentIndex * 100 - this.diff;
          this.sliderBgTranslate = -this.sliderTranslate * 0.5;
        })
        document.getElementById('container').addEventListener('touchend', (ev) => {
          document.getElementById('container').removeEventListener('touchmove', () => null);
          if (this.animating) return;
          if (!this.diff) {
            this.changeSlides(true);
            return;
          }
          if (this.diff > -8 && this.diff < 8) {
            this.changeSlides();
            return;
          }
          if (this.diff <= -8) {
            this.onPreviousOrNextClick(0);
          }
          if (this.diff >= 8) {
            this.onPreviousOrNextClick(1);
          }
        })
      })
    } else {
      document.getElementById('container').onmousedown = (event: any) => {
        console.log(1, this.animating)
        if (this.animating) return;
        window.clearTimeout(this.autoSlideTimeout);
        let startX = event.pageX || event.changedTouches[0].pageX,
          winW = window.innerWidth;
        this.diff = 0;

        document.getElementById('container').onmousemove = (e: any) => {
          let x = e.pageX || e.changedTouches[0].pageX;
          this.diff = (startX - x) / winW * 70;
          if ((!this.currentIndex && this.diff < 0) || (this.currentIndex === this.data.length - 1 && this.diff > 0)) {
            this.diff /= 2;
            console.log('iiiiiiiiiii')
          }
          this.sliderTranslate = -this.currentIndex * 100 - this.diff;
          this.sliderBgTranslate = -this.sliderTranslate * 0.5;
          console.log(this.sliderTranslate, this.sliderBgTranslate)
        }
        document.getElementById('container').onmouseup = (event: any) => {
          document.getElementById('container').onmousemove = null;
          if (this.animating) return;
          if (!this.diff) {
            this.changeSlides(true);
            return;
          }
          if (this.diff > -8 && this.diff < 8) {
            this.changeSlides();
            return;
          }
          if (this.diff <= -8) {
            this.onPreviousOrNextClick(0);
          }
          if (this.diff >= 8) {
            this.onPreviousOrNextClick(1);
          }
        }
      }
    }
  }

  private isMobile(): boolean {
    return window.innerWidth < 599
  }

  private autoPlay() {
    let self = this;
    this.autoSlideTimeout = setTimeout(() => {
      self.currentIndex++;
      if (self.currentIndex > self.data.length - 1) {
        self.currentIndex = 0;
      }
      self.changeSlides();
    }, self.animateTime);
  }

  onPagiItemClick(index: number): any {
    this.currentIndex = index;
    this.changeSlides();
  }

  onPreviousOrNextClick(direction: number) {
    if (this.animating) return;
    if (direction) {
      if (this.currentIndex < this.data.length - 1) {
        this.currentIndex++;
      }
    } else {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    }
    this.changeSlides();
  }

  changeSlides(instant?: boolean): void {

    if (!instant) {
      this.animating = true;
      let self = this;
      setTimeout(function () {
        self.animating = false;
      }, 500);
    }
    window.clearTimeout(this.autoSlideTimeout);
    this.sliderTranslate = -this.currentIndex * 100;
    this.sliderBgTranslate = this.currentIndex * 50;
    this.diff = 0;
    this.autoPlay();
    console.log('sliderTranslate', this.sliderTranslate)
    console.log('sliderBgTranslate', this.sliderBgTranslate)
  }

}
