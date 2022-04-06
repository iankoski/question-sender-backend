import { Request, Response } from 'express';
import { IQuestion } from '../models/questions';
import repository from '../models/questionRepository';
import controllerCommons from 'ms-commons/api/controllers/controller';
import {QuestionStatus} from '../models/questionStatus';
import {Token} from 'ms-commons/api/auth';

const questions: IQuestion[] = [];

async function getQuestions(req: Request, res: Response, next: any) {
    try {
        const token = controllerCommons.getToken(res) as Token;
        const includeRemoved = req.query.includeRemoved == 'true';
        const questions = await repository.findAll(token.companyId, includeRemoved);
        res.json(questions);
    } catch (error) {
        console.log(`getQuestions: ${error}`);
        res.sendStatus(400);
    }
}

async function getQuestion(req: Request, res: Response, next: any) {
    try {
        const id = parseInt(req.params.id);
        const companyId = parseInt(req.params.id);
        if (!id) return res.status(400).json({ message: 'id is required' });

        const token = controllerCommons.getToken(res) as Token;
        const question = await repository.findById(id);
        if (question === null) return res.status(404).json({ message: 'question not found' });
        else res.json(question);
    } catch (error) {
        console.log(`getQuestion: ${error}`);
        res.sendStatus(400);
    }
}

async function getQuestionsByDate(req: Request, res: Response, next: any) {
    try{
        const companyId = parseInt(req.params.companyId);
        if (!companyId) return res.status(400).json({message: 'companyid is required'});
        const questions = await repository.findByBetweenDate(companyId);
        res.status(200).json(questions);
    }catch(error){
        console.log(`getQuestionsByDate: ${error}`);
        res.sendStatus(400);        
    }
}

async function addQuestion(req: Request, res: Response, next: any) {
    try {
        const newQuestion = req.body as IQuestion;
        const token = controllerCommons.getToken(res) as Token;
        newQuestion.companyId = token.companyId;
        const result = await repository.add(newQuestion);
        newQuestion.id = result.id; 
        res.status(201).json(newQuestion);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}

async function setQuestion(req: Request, res: Response, next: any){
    try{
        const questionId = parseInt(req.params.id);
        if (!questionId) res.status(400).json({message: 'id is required'});     

        const token = controllerCommons.getToken(res) as Token;
        const question = req.body as IQuestion;
        const result = await repository.set(questionId, question);
        if (!result) return res.sendStatus(404);
        
        res.json(result);

    }catch(error){
        console.log(`setQuestion: ${error}`);
        res.sendStatus(404);     
    }
}

async function deleteQuestion(req: Request, res: Response, next: any){
    try{
        
        const questionId = parseInt(req.params.id);
        
        if (!questionId) return res.status(400).json({message: 'id is required'});

        const token = controllerCommons.getToken(res) as Token;

        if (req.query.force === 'true'){
            await repository.removeById(questionId);
            res.sendStatus(204);//sucesso sem conteúdo para retornar
        } else {
            const questionParams = {
                status: QuestionStatus.REMOVED
            } as IQuestion;
            const updatedQuestion = repository.set(questionId, questionParams);
            if (updatedQuestion) {
                res.json(updatedQuestion);
            }
            res.sendStatus(403);
        }       
        

    }catch(error){
        console.log(`deleteQuestion: ${error}`);
        res.sendStatus(400);
    }
}

export default { getQuestions, getQuestion, addQuestion, setQuestion, deleteQuestion, getQuestionsByDate};