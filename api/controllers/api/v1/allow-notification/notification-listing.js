module.exports = {


    friendlyName: ' Get Notification List',
  
  
    description: '',
  
  
    inputs: {

      limit: {
        type: 'number',
        defaultsTo: 3
      },
      offset: {
          type: 'number',
          defaultsTo: 0
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
      sails.log.debug('Running api/v1/allow-notification/toggle ');
      try {
        const { status, data, headers } = await sails.helpers.request.with({
          req: this.req,
          type: 'GET',
          server: 'LOGIC',
          endpoint: 'get-notification-list',
          params: inputs
        });
        this.res.set(headers);
        [exitsName, responseData] = await sails.helpers.response.with({
          status: status,
          data: data,
        });
      }
      catch (err) {
        sails.log.error('error calling api/v1/allow-notification/toggle', err.message);
        [exitsName, responseData] = await sails.helpers.response.with({
          status: err.response.status,
          data: err.response.data
        });
      }
      return exits[exitsName](responseData);
    }
  };
  