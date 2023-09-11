export declare class CreateQuestionDto {
    text: string;
    mediaUrl?: string;
    format: string;
    options?: string[];
    correctAnswers?: string[];
    timer?: number;
    quiz: any;
}
