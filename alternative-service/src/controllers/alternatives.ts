import { Request, Response } from 'express';
import { IAlternative } from '../models/alternatives';
import repository from '../models/alternativeRepository';
import controllerCommons from 'ms-commons/api/controllers/controller';
import {AlternativeStatus} from '../models/alternativeStatus';
import {Token} from 'ms-commons/api/auth';

const alternatives: IAlternative[] = [];

async function getAlternatives(req: Request, res: Response, next: any) {
    try {
        const includeRemoved = req.query.includeRemoved == 'true';
        const questionId = parseInt(req.params.questionId);
        const alternatives = await repository.findByQuestion(includeRemoved, questionId);
        res.json(alternatives);
    } catch (error) {
        console.log(`getAlternatives: ${error}`);
        res.sendStatus(400);
    }
}
/*Verificar a necessidade*/
async function getNextAlternativeLetter(req: Request, res: Response, next: any) {
    try{
        const nextAlternativeNumber = parseInt(req.params.nextAlternativeNumber);
        const teste = String.fromCharCode('a'.charCodeAt(nextAlternativeNumber));
        if (nextAlternativeNumber === null) res.status(400).json({ message: 'alternative number is required' });
        res.status(200).json(String.fromCharCode('A'.charCodeAt(0)+nextAlternativeNumber));
    }catch(error){
        console.log(`getNextAlternativeLetter: ${error}`);
        res.sendStatus(400);        
    }
}

async function getAlternative(req: Request, res: Response, next: any) {
    try {
        const id = parseInt(req.params.id);
        if (!id) return res.status(400).json({ message: 'id is required' });
        const alternative = await repository.findById(id);
        if (alternative === null) return res.status(404).json({ message: 'alternative not found' });
        else res.json(alternative);
    } catch (error) {
        console.log(`getAlternative: ${error}`);
        res.sendStatus(400);
    }
}

async function addAlternative(req: Request, res: Response, next: any) {
    try {        
        /*var alternativesList = req.body as IAlternative;
        alternativesList.map((a) => (

        ));*/
        const newAlternative = req.body as IAlternative[];
        console.log('teste addAlternative');
        console.log(` ${newAlternative}`);
        const result = await repository.add(newAlternative);
        //newAlternative.id = result.id; 
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

export default { getAlternatives, getAlternative, addAlternative, setAlternative, deleteAlternative, getNextAlternativeLetter};