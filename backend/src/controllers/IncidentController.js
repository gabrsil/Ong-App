const connection = require('../database/connection');


module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query; 
        
        //retorna o total de registros
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_ig') //pega dados de outra tabela pelo join
        .limit(5) //pega de 5 em 5 registros
        .offset((page - 1) * 5) //registros pegados
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization; //nome do header enviado pode ser qualquer um

        const [id] = await connection('incidents').insert({
            title,
            description, 
            value,
            ong_id
        });

        return response.json({ id });
        
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
           .where('id', id)
           .select('ong_id')
           .first();

           if(incident.ong_id != ong_id) {
               return response.status(401).json({ error: 'Operation not permitted.' });
           }

           await connection('incidents').where('id', id).delete();

           return response.status(204).send();
    }
}