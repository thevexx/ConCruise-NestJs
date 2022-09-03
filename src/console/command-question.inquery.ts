import { Question, QuestionSet,  } from "nest-commander";

@QuestionSet({ name: 'command-question' })
export class CommandQuestions {
    @Question({
        message: 'What command would you like to execute ?',
        name: 'command'
    })
    parseCommand(val: string) {
        return val;
    }
}