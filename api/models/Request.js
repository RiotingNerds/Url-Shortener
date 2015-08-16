/**
* Request.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var ip = require('ip')
module.exports = {

  attributes: {
    URLID: {type: 'integer'},
    requestDate: {type: 'datetime'},
    browser: {type: 'string'},
    location : {type: 'string'},
    locationCode : {type: 'string'},
    rawLocation : {type: 'string'},
    ip: {type: 'string'},
    ipv6: {type: 'string'},
    rawRequest: {type: 'text'},
    referrer: {type: 'text'},
    requestType: {type: 'string'},
    queryString: {type: 'string'},
    payload: {type: 'text'}
  },
  addRequest: function(req,urlModel) {
    var headers = JSON.stringify(req.headers)
    var query = JSON.stringify(req.query)
    var params = {
      URLID: urlModel.id,
      requestDate: new Date(),
      rawRequest: headers,
      payload: req.body,
      ip:req.ip,
      queryString: query,
      referrer: req.get('referrer')
    }
    Request.create(params).exec(function(err,result) {
      Request.count({URLID:urlModel.id},function(err,count) {
        Url.update({id:urlModel.id},{totalRequested:count,lastRequested:new Date()},function(err,URLResult){

        })
        RequestLocation.addRecord(result)
      })
    })


  }
};
