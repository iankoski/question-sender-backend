import { Request, Response } from 'express';
import { IAnswer } from '../models/answers';
import repository from '../models/answerRepository';
import controllerCommons from 'ms-commons/api/controllers/controller';
import { AnswerStatus } from '../models/answerStatus';
import { Token } from 'ms-commons/api/auth';

const answers: IAnswer[] = [];

async function getAnswers(req: Request, res: Response, next: any) {
    try {
        const token = controllerCommons.getToken(res) as Token;
        const includeRemoved = req.query.includeRemoved == 'true';
        const answers = await repository.findAll(token.companyId, includeRemoved);
        res.json(answers);
    } catch (error) {
        console.log(`getAnswers: ${error}`);
        res.sendStatus(400);
    }
}

async function getAnswer(req: Request, res: Response, next: any) {
    try {
        const id = parseInt(req.params.id);
        const companyId = parseInt(req.params.id);
        if (!id) return res.status(400).json({ message: 'id is required' });

        const token = controllerCommons.getToken(res) as Token;
        const answer = await repository.findById(id, token.companyId);
        if (answer === null) return res.status(404).json({ message: 'answer not found' });
        else res.json(answer);
    } catch (error) {
        console.log(`getAnswer: ${error}`);
        res.sendStatus(400);
    }
}

async function addAnswer(req: Request, res: Response, next: any) {
    try {
        
        const newAnswer = req.body as IAnswer;
        console.log('newAnswer.alternativeId '+newAnswer.alternativeId + ' newAnswer.companyId '+newAnswer.companyId + ' newAnswer.questionId '+newAnswer.questionId+' newAnswer.deviceId '+newAnswer.deviceId);
        const result = await repository.add(newAnswer);
        newAnswer.id = result.id;
        res.status(201).json(newAnswer);
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

async function setAnswer(req: Request, res: Response, next: any) {
    try {
        const answerId = parseInt(req.params.id);
        if (!answerId) res.status(400).json({ message: 'id is required' });

        const token = controllerCommons.getToken(res) as Token;
        const answer = req.body as IAnswer;
        const result = await repository.set(answerId, answer);
        if (!result) return res.sendStatus(404);

        res.json(result);

    } catch (error) {
        console.log(`setAnswer: ${error}`);
        res.sendStatus(404);
    }
}

async function getAnswerCountByAlternative(req: Request, res: Response, next: any) {
    try {
        const alternativeId = parseInt(req.params.alternativeId);
        if (!alternativeId) res.status(400).json({ message: 'id is required' });
        const result = await repository.findAndCountByAlternativeId(alternativeId);
        if (result === 0) return res.json(result);
        if (!result) return res.sendStatus(404);
        res.json(result);
    } catch (error) {
        console.log(`getAnswerCount: ${error}`);
        res.sendStatus(404);
    }
}

async function getAnswerCountByQuestion(req: Request, res: Response, next: any) {
    try {
        const questionId = parseInt(req.params.questionId);
        if (!questionId) res.status(400).json({ message: 'id is required' });
        const result = await repository.findAndCountByQuestionId(questionId);
        if (result === 0) return res.json(result);
        if (!result) return res.sendStatus(404);
        res.json(result);
    } catch (error) {
        console.log(`getAnswerCount: ${error}`);
        res.sendStatus(404);
    }
}

/* Retorna o Id da pergunta mais respondida e a quantidade de respostas */
async function getMostAnsweredAlternative(req: Request, res: Response, next: any) {
    try {
        const questionId = parseInt(req.params.questionId);
        if (!questionId) res.status(400).json({ message: 'id is required' });
        const result = await repository.MostAnsweredAlterantive(questionId);
        //204 No Content
        if (!result) return res.sendStatus(204);
        res.json(result);
    } catch (error) {
        console.log(`getMostAnsweredAlterantive: ${error}`);
        res.sendStatus(404);
    }
}

async function deleteAnswer(req: Request, res: Response, next: any) {
    try {

        const answerId = parseInt(req.params.id);

        if (!answerId) return res.status(400).json({ message: 'id is required' });

        const token = controllerCommons.getToken(res) as Token;

        if (req.query.force === 'true') {
            await repository.removeById(answerId);
            res.sendStatus(204);//sucesso sem conteúdo para retornar
        } else {
            const answerParams = {
                status: AnswerStatus.REMOVED
            } as IAnswer;
            const updatedAnswer = repository.set(answerId, answerParams);
            if (updatedAnswer) {
                res.json(updatedAnswer);
            }
            res.sendStatus(403);
        }


    } catch (error) {
        console.log(`deleteAnswer: ${error}`);
        res.sendStatus(400);
    }
}

export default { getAnswers, getAnswer, addAnswer, setAnswer, deleteAnswer, getAnswerCountByAlternative, getMostAnsweredAlternative, getAnswerCountByQuestion};