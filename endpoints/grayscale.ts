import { Request, Response } from 'express';
import sharp from 'sharp';
import axios from 'axios';

async function handleRequest(req: Request, res: Response) {
    const imageUrl = req.query.url as string;
    if (!imageUrl) {
        res.status(400).send("Please provide an image url");
        return;
    }
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');
    
        const grayscaleImage = await sharp(imageBuffer)
          .grayscale()
          .toBuffer();
    
        res.set('Content-Type', 'image/png');
        res.send(grayscaleImage);
    } catch (error) {
        res.status(500).send("An error occurred");
    }


}

export default handleRequest;