export class Player {
    score: number = 0;
    missed: number = 0;

    public IncreaseScore(){
        this.score =+ 1;
    }

    public IncreaseMissCount(){
        this.missed =+ 1;
    }
}