import { Request, Response } from 'express';
import sharp from 'sharp';
import axios from 'axios';

async function handleRequest(req: Request, res: Response) {
    const imageUrl = req.query.url as string;
    const rotateDegree = req.query.degree as string;
    if (!imageUrl) {
        res.status(400).send("Please provide an image url");
        return;
    }
    if (!rotateDegree) {
        res.status(400).send("Please provide a degree to rotate");
        return;
    }
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');
    
        const rotateImage = await sharp(imageBuffer)
          .rotate(parseInt(rotateDegree))
          .toBuffer();
    
        res.set('Content-Type', 'image/png');
        res.send(rotateImage);
    } catch (error) {
        res.status(500).send("An error occurred");
    }


}

export default handleRequest;