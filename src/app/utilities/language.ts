export class Language {

    constructor() {
    }

    public static processCount(
        word: string,
        count: number
    ): string {
        if (count === 0 || count > 1) {
            return word + 's';
        } else {
            return word;
        }
    }

}