import { spawn } from 'child_process';

export const checkWithProlog = (newText, existingTexts) => {
    return new Promise((resolve, reject) => {
       
        const prologList = `[${existingTexts.map(text => `'${text.replace(/'/g, "\\'")}'`).join(', ')}]`;
        const command = `check_todo('${newText.replace(/'/g, "\\'")}', ${prologList}), halt.`;

        const prolog = spawn('swipl', ['-s', 'src/prolog/todo.pl', '-g', command]);

        let output = '';
        let error = '';

        prolog.stdout.on('data', (data) => {
            output += data.toString();
        });

        prolog.stderr.on('data', (data) => {
            error += data.toString();
        });

        prolog.on('close', (code) => {
            if (error) {
                reject(new Error(error));
            } else {
                resolve(output.trim());
            }
        });
    });
};
