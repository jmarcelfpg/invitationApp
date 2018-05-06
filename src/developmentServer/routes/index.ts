import { NextFunction, Request, RequestHandler, Response } from 'express';
import path from 'path';
import * as user from './user';

export const User = user;

export const board: RequestHandler = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'board.html'));
};
export const admin: RequestHandler = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'admin.html'));
};
export const profile: RequestHandler = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'profile.html'));
};
export const resetPass: RequestHandler = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'resetPass.html'));
};
export const registered: RequestHandler = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'registered.html'));
};
export const register: RequestHandler = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'register.html'));
};
export const registerAdmin: RequestHandler = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'registerAdmin.html'));
};
