import type { Response, Request, NextFunction } from "express";

// Validate Request Body
export const ValidateRequestBody = (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {

    const Values = Object.values(req.body).join(' ').split(' ');

    const Keys = Object.keys(req.body).join(' ').split(' ');

    for (const vals of Values) {


        if (vals == "" || vals == null || vals == undefined) {

            return res.status(400).json({ error: `"${Keys[Values.indexOf(vals)]}" input was empty` });

        }

    }
    
    next();

}