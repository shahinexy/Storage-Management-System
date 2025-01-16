import express from "express";

const router = express.Router()

const moduleRouter = [
    {
        path: '/folder',
        router: []
    },
]

moduleRouter.forEach((route) => router.use(route.path, route.router))