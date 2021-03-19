const AppModel = require('../models/app.model')
const request = require('request')
const cheerio = require('cheerio')

class AppController {
    requestToUrl(url) {
        request(url, (err, res, body) => {
            if (err) {
                return err
            } else {
                this.writeDataToDb(body)
            }
        })

    }

    writeDataToDb(body) {
        let data = []
        let metaData = {}

        const $ = cheerio.load(body)
        $('.gallerywide>li').each(function (i, el) {
            let item = $(el)

            // Our parsed meta data object
            metaData = {
                title: item.children('.inner').children('.normal').children('.linkWithHash').text(),
                url: item.children('.mheight').find('img').attr('src'),
                city: item.children('.date-location').text(),
                price: item.children('.price').text()
            }
            data.push(metaData)
        })

        const newData = new AppModel({items: data})
        AppModel.find({}, (err, data) => {
            if (data.length <= 0) {
                newData.save((err) => {
                    if (err) {
                        return err
                    }
                    return "Successfully write to DB"
                })
            } else {
                return "Item already exist"
            }
        })
    }

    async renderPage(req, res) {
        try {
            const data = await AppModel.findOne()
            if (data && data.items) {
                res.render('home', {items: data.items})
            }
        } catch (err) {
            throw new Error(err)
        }


    }


}

module.exports = new AppController()