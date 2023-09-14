export declare class CreateQuestionDto {
    text: string;
    mediaUrl?: string;
    format: string;
    options?: string[];
    correctAnswers?: string[];
    multipleAnswers?: boolean;
    timer?: number;
    point: string;
    quiz: any;
}
