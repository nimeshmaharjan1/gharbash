import { createClient } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer';
import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';

const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('Hello image upload');
    const { method, body } = req;
    switch (method) {
        case 'POST':
            let { image } = body;
            if (!image) {
                return res.status(500).json({ message: 'No image provided' });
            }
            try {
                const contentType = image.match(/data:(.*);base64/)?.[1];
                const base64FileData = image.split('base64,')?.[1];
                if (!contentType || !base64FileData) {
                    return res.status(500).json({ message: 'Image data not valid.' });
                }
                const filename = nanoid();
                const ext = contentType.split('/')[1];
                const path = `${filename}.${ext}`;
                const { data, error: uploadError } = await supabase.storage
                    .from(process.env.SUPABASE_BUCKET as string)
                    .upload(path, decode(base64FileData), {
                        contentType,
                        upsert: true,
                    });
                if (uploadError) {
                    throw new Error('Unable to upload image to storage.');
                }
                console.log(image);
                const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/homes/${data.path}`;
                console.log({ url });
                return res.status(200).json({ message: 'Image uploaded successfully', url });
            } catch (error) {
                res.status(500).json({ error, message: 'Something went wrong.' });
            }
    }
}
