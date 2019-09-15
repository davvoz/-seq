

export  class UserGui {
  par;
  constructor(private ctx: CanvasRenderingContext2D ,par:string) {
    this.par = par;
  }
  private getText() {
    return this.par
  }
  public draw(){
      this.ctx.fillStyle='rgb(0,0,0)';
    this.ctx.font = "20px IMPACT";
    this.ctx.fillText('POINT '+ this.getText(),200,290);
  }
}