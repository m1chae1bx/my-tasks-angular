export class DateUtil {

    constructor() {
    }

    static initDate(): void {
        this.today = new Date();
        this.today.setHours(0,0,0,0);
        this.tomorrow = new Date(this.today.getTime());
        this.tomorrow.setDate(this.tomorrow.getDate() + 1);
        this.overmorrow = new Date(this.tomorrow.getTime());
        this.overmorrow.setDate(this.overmorrow.getDate() + 1);
        this.nextWeek = new Date(this.tomorrow.getTime());
        this.nextWeek.setDate(this.nextWeek.getDate() + 6);
    }

    static today: Date;
    static tomorrow: Date;
    static overmorrow: Date;
    static nextWeek: Date;

}