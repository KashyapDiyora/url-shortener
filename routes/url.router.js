import {Router} from "express";
import {urlController} from "../controllers/url.controller.js"

const router = Router();

router.post('/',urlController.handleGenerateNewShortURL);

router.route('/:shortId')
.get(urlController.handleRedirectRequest)
.post(urlController.handleAnalysisRequest)

export {
    router
};