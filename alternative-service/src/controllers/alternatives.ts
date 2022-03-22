import { Request, Response } from 'express';
import { IAlternative } from '../models/alternatives';
import repository from '../models/alternativeRepository';
import controllerCommons from 'ms-commons/api/controllers/controller';
import {AlternativeStatus} from '../models/alternativeStatus';
import {Token} from 'ms-commons/api/auth';

const alternatives: IAlternative[] = [];

async function getAlternatives(req: Request, res: Response, next: any) {
    try {
        const token = controllerCommons.getToken(res) as Token;
        const includeRemoved = req.query.includeRemoved == 'true';
        const questionId = parseInt(req.params.questionId);
        const alternatives = await repository.findByQuestion(token.companyId, includeRemoved, questionId);
        res.json(alternatives);
    } catch (error) {
        console.log(`getAlternatives: ${error}`);
        res.sendStatus(400);
    }
}

async function getAlternative(req: Request, res: Response, next: any) {
    try {
        const id = parseInt(req.params.id);
        const companyId = parseInt(req.params.id);
        if (!id) return res.status(400).json({ message: 'id is required' });

        const token = controllerCommons.getToken(res) as Token;
        const alternative = await repository.findById(id, token.companyId);
        if (alternative === null) return res.status(404).json({ message: 'alternative not found' });
        else res.json(alternative);
    } catch (error) {
        console.log(`getAlternative: ${error}`);
        res.sendStatus(400);
    }
}

async function addAlternative(req: Request, res: Response, next: any) {
    try {
        const newAlternative = req.body as IAlternative;
        const result = await repository.add(newAlternative);
        newAlternative.id = result.id; 
        res.status(201).json(newAlternative);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}

async function setAlternative(req: Request, res: Response, next: any){
    try{
        const alternativeId = parseInt(req.params.id);
        if (!alternativeId) res.status(400).json({message: 'id is required'});     

        const token = controllerCommons.getToken(res) as Token;
        const alternative = req.body as IAlternative;
        const result = await repository.set(alternativeId, alternative);
        if (!result) return res.sendStatus(404);
        
        res.json(result);

    }catch(error){
        console.log(`setAlternative: ${error}`);
        res.sendStatus(404);     
    }
}

async function deleteAlternative(req: Request, res: Response, next: any){
    try{
        
        const alternativeId = parseInt(req.params.id);
        
        if (!alternativeId) return res.status(400).json({message: 'id is required'});

        const token = controllerCommons.getToken(res) as Token;

        if (req.query.force === 'true'){
            await repository.removeById(alternativeId);
            res.sendStatus(204);//sucesso sem conteúdo para retornar
        } else {
            const alternativeParams = {
                status: AlternativeStatus.REMOVED
            } as IAlternative;
            const updatedAlternative = repository.set(alternativeId, alternativeParams);
            if (updatedAlternative) {
                res.json(updatedAlternative);
            }
            res.sendStatus(403);
        }       
        

    }catch(error){
        console.log(`deleteAlternative: ${error}`);
        res.sendStatus(400);
    }
}

export default { getAlternatives, getAlternative, addAlternative, setAlternative, deleteAlternative};