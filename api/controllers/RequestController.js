/**
 * RequestController
 *
 * @description :: Server-side logic for managing requests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	redirect: function(req,res) {
		var hash = req.param('hash','')
		if(hash != '') {
			var hostName = req.headers.host
			hostName = 'boxe.sg'
			Domain.findOne({domain:hostName}, function(err,domainResult) {
				if (!res.getHeader('Cache-Control'))
					res.setHeader('Cache-Control', 'public, max-age=' + (60*30));
				if(domainResult) {
					Url.findOne({domainID:domainResult.id,hash:hash}, function(err,result) {
						if(result) {
							Request.addRequest(req,result)
							return res.redirect(301, result.redirectURL);
						}
						else {
							return res.redirect(301, domainResult.defaultLink || '/');
						}
					})
				} else {
					return res.redirect(301, '/');
				}

			})
		}
	},
};
