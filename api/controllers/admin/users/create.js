module.exports = {


    friendlyName: 'Property is sold',


    description: '',
    inputs: {

        user : {
            type: 'ref'
      },

      full_name:{
      //required:true,
      type:'string'
      },
      agency_name:{
      //  required:true,
        type:'string'
        },
      email:{
      //  required:true,
        type:'string'
        },
      password:{
      //  required:true,
        type:'string'
        },
        phone:{
        //  required:true,
          type:'string'
          },
      location:{
      //  required:true,
        type:'string'
      },
      availability_from:{
       // required:true,
        type:'string'
      },
      availability_to:{
     //   required:true,
        type:'string'
      },
      bio:{
      //  required:true,
        type:'string'
      },
      profile_image:{
        //required:true,
        type:'string'
      },
  
  
    },

    exits: {
        invalid: {
            responseType: 'badRequest',
        },
        unauthorized: {
            responseType: 'unauthorized'
        },
        forbidden: {
            responseType: 'forbidden',
        },
        serverError: {
            responseType: 'serverError',
        },
        notFound: {
            responseType: 'notFound',
        }
    },

    fn: async function (inputs, exits) {
        sails.log.debug('Running api/v1/admin/users/create.js with inputs ' + JSON.stringify(inputs));
        try {
          const { status, data, headers } = await sails.helpers.request.with({
              req: this.req,
              type: 'POST',
              server: 'LOGIC',
              endpoint: `admin/users`,
              params: inputs

              
          });
          this.res.set(headers);
          [exitsName, responseData] = await sails.helpers.response.with({
              status: status,
              data: data,
          });
      }
        catch (err) {
            sails.log.error('error calling  api/v1/admin/users/create.js ', err.message);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: err.response.status,
                data: err.response.data
            });
        }
        return exits[exitsName](responseData);
    }
};
