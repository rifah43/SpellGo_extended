class Reward{
    constructor(config){
        this.ctx=config.ctx;
        this.maxScore=config.maxScore;
        this.totalScore=this.getScore();
    }

    
    getScore(){
        const totalTime=this.ctx.countdown.duration;
        const totalLives=this.ctx.rewind.totalLives;
        const remainingLives=this.ctx.rewind.remainingLives;
        const remainingTime=this.ctx.countdown.remainingTime;

        this.timeEfficiency=remainingTime/totalTime;
        const livesEfficiency=remainingLives/totalLives;

        const scoreEfficiency=(this.timeEfficiency*0.6)+(livesEfficiency*0.4);
        const totalScore=Math.ceil(scoreEfficiency*this.maxScore);
        
        return totalScore;
    }
    getTime() {
        return this.timeEfficiency;
      }
}