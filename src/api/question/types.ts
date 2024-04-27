export interface PollQuestion {
    depends_min?: number;
    depends_on_id?: number;
    id?: number;
    number?: number;
    pollId?: number;
    text?: string;
}

export type PollQuestionBody = Pick<
    PollQuestion,
    'depends_min' | 'depends_on_id' | 'id' | 'text'
>;

export interface Poll {
    createdAt: string;
    id: number;
    name: string;
    questions?: PollQuestion;
}
