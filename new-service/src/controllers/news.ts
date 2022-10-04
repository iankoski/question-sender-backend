import { Request, Response } from 'express';

import { INew } from '../models/news';
import repository from '../models/newRepository';
import controllerCommons from 'ms-commons/api/controllers/controller';
import {NewStatus} from '../models/newStatus';
import {Token} from 'ms-commons/api/auth';

async function getNews(req: Request, res: Response, next: any) {
    try {
        const token = controllerCommons.getToken(res) as Token;
        const news = await repository.findAll(token.companyId);
        res.json(news);
    } catch (error) {
        console.log(`getNew: ${error}`);
        res.sendStatus(400);
    }
}

async function getNew(req: Request, res: Response, next: any) {
    try {
        const id = parseInt(req.params.id);
        if (!id) return res.status(400).json({ message: 'id is required' });
        const news = await repository.findById(id);
        if (news === null) return res.status(404).json({ message: 'new not found' });
        else res.json(news);
    } catch (error) {
        console.log(`getNew: ${error}`);
        res.sendStatus(400);
    }
}

async function getNewsByDate(req: Request, res: Response, next: any) {
    try{
        const companyId = parseInt(req.params.companyId);        
        if (!companyId) return res.status(400).json({message: 'companyid is required'});
        const news = await repository.findByBetweenDate(companyId);
        res.json(news);
    }catch(error){
        console.log(`getNewsByDate: ${error}`);
        res.sendStatus(400);        
    }
}

async function addNew(req: Request, res: Response, next: any) {
    try {
        const newNew = req.body as INew;
        const token = controllerCommons.getToken(res) as Token;
        newNew.companyId = token.companyId;
        const result = await repository.add(newNew);
        newNew.id = result.id; 
        console.log('newNew: '+newNew.id);
        res.status(201).json(newNew);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}

async function setNews(req: Request, res: Response, next: any){
    try{
        const newId = parseInt(req.params.id);
        if (!newId) res.status(400).json({message: 'id is required'});     

        const token = controllerCommons.getToken(res) as Token;
        const news = req.body as INew;
        const result = await repository.set(newId, news);
        if (!result) return res.sendStatus(404);        
        res.json(result);

    }catch(error){
        console.log(`setNew: ${error}`);
        res.sendStatus(404);     
    }
}

async function deleteNew(req: Request, res: Response, next: any){
    try{

        const newId = parseInt(req.params.id);
        
        if (!newId) return res.status(400).json({message: 'id is required'});
        const token = controllerCommons.getToken(res) as Token;
        if (req.query.force === 'true'){
            await repository.removeById(newId);
            res.sendStatus(204);//sucesso sem conteúdo para retornar
        } else {
            const newParams = {
                status: NewStatus.REMOVED
            } as INew;
            const updatedNew = await repository.set(newId, newParams);
            if (updatedNew) {
                res.status(200).json(updatedNew);
            }         
        }       
        

    }catch(error){
        console.log(`deleteNew: ${error}`);
        res.sendStatus(400);
    }
}

export default { getNews, getNew, getNewsByDate, addNew, setNews, deleteNew};