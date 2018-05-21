 (function() {
    'use strict';
    const noteDocument = $(document)
    const createButton = $('#create-btn')
    const notesList    = $('.list-group.list-group-flush')

    const helpers = {
        /**
         * On click, create a new note and redirect to it...
         */
        createNoteAndRedirect: evt => {
            axios.post('/api/notes')
                .then(response => (window.location = '/notes/'+response.data.data.Slug))
                .catch( e => {
                    console.error('[ERROR] app.js > createNoteAndRedirect : ', e);
                })
        },

        /**
         * Load the notes to the page...
         */
        loadNotes: evt => {
            axios.get('/api/notes').then(response => {
                const notes = response.data.data

                for (const key in notes) {
                    if (notes.hasOwnProperty(key)) {
                        notesList.append(
                            `<a href="/notes/${notes[key].Slug}" class="list-group-item list-group-item-action">
                                ${notes[key].Title}
                            </a>`
                        )
                    }
                }
            }).catch( e => {
                console.error('[ERROR] app.js > loadNotes : ', e);
            });
        }
    }

    noteDocument.ready(helpers.loadNotes)
    createButton.click(helpers.createNoteAndRedirect)
}())
// var axios = require("axios");

// var apiUrl = " https://www.goodreads.com/book/iliad.json"
// var queryStr = "?key=fx38lLo5vKung09uEfz6g&format=json&title=iliad"
// var testURL = "https://www.goodreads.com/book/review_counts.json?key={apikey}&isbns=0596009208,0596517742"
// axios.get(testURL).then(res => {console.log(res)})









 // (function() {
 //        const noteDocument = $(document)
 //        const createButton = $('#create-btn')
 //        const notesList    = $('.list-group.list-group-flush')

 //        const helpers = {
 //            /**
 //             * On click, create a new note and redirect to it...
 //             */
 //            createNoteAndRedirect: evt => {
 //                axios.post('/api/notes').then(response => (window.location = '/notes/'+response.data.data.Slug))
 //            },

 //            /**
 //             * Load the notes to the page...
 //             */
 //            loadNotes: evt => {
 //                axios.get('/api/notes').then(response => {
 //                    const notes = response.data.data
 //                    for (const key in notes) {
 //                        if (notes.hasOwnProperty(key)) {
 //                            notesList.append(
 //                                `<a href="/notes/${notes[key].Slug}" class="list-group-item list-group-item-action">
 //                                    ${notes[key].Title}
 //                                </a>`
 //                            )
 //                        }
 //                    }
 //                })
 //            }
 //        }

 //        noteDocument.ready(helpers.loadNotes)
 //        createButton.click(helpers.createNoteAndRedirect)
 //    }())