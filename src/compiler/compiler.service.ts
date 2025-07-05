/* eslint-disable prettier/prettier */
// src/compiler/compiler.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CompilerService {
  async compileCode(code: string, languageId: number): Promise<any> {
    const submission = {
      source_code: code,
      language_id: languageId, // e.g., 52 for Python 3
    };

    const response = await axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
      submission,
      {
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          'X-RapidAPI-Key': '2d204f0f9dmsh9c5a3d548b9b891p1ab880jsn', // get it from RapidAPI
        },
      }
    );

    return response.data;
  }
}

