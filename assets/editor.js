(function() {
        const noteDocument = $(document)
        const collaboratorsText = $('.navbar-brand .commentary')
        const PUSHER_INSTANCE_LOCATOR = "v1:us1:54bea3be-ee28-4ea6-bf22-ab2c4c4a5b46"

        let note = {
            title: null,
            collaborators: [],
            textSync: undefined,
            currentNote: undefined,
        }

        const helpers = {
            /**
             * Load the note editors.
             */
            loadNoteEditors: () => {

                console.log('Editor.js > loadNoteEditors AAAA');
                const noteSlug = document.URL.substr(document.URL.lastIndexOf('/') + 1)

                axios.get(`/api/notes/${noteSlug}`)
                    .then(response => {
                        note.currentNote = response.data.data
                        $('title').text(note.Title)
                        note.textSync = new TextSync({ instanceLocator: PUSHER_INSTANCE_LOCATOR });
                        console.log('Editor.js > loadNoteEditors BBBB');
                        helpers.createTitleTextEditor()
                        console.log('Editor.js > loadNoteEditors CCCC');
                        helpers.createContentTextEditor()
                        console.log('Editor.js > loadNoteEditors DDDD');
                    })
                    .then(() => {
                        setTimeout(() => {
                            console.log('Editor.js > loadNoteEditors EEEEEE');
                            document.querySelector("#titleEditor .ql-editor")
                                    .addEventListener("input", _.debounce(helpers.updateNoteTitle, 1000));
                            console.log('Editor.js > loadNoteEditors FFFFFF');
                        }, 3000)
                    })
                    .catch( e => {
                        console.error('[ERROR] editor.js > loadNoteEditors : ', e);
                        window.location = '/'
                    })
            },

            /**
             * Update the title of the note.
             */
            updateNoteTitle: () => {
                console.log('Editor.js > updateNoteTitle AAAA');
                const title = $('#titleEditor .ql-editor').text()
                axios
                    .put(`/api/notes/${note.currentNote.Slug}`, {title})
                    .then( () => {
                        console.log('Editor.js > loadNoteEditors BBBBB');
                    })
                    .catch( e => {
                       console.error('[ERROR] editor.js > updateNoteTitle : ', e);

                    })
            },

            /**
            * Create the text editor for the main content.
            *
            * @see https://docs.pusher.com/textsync/reference/js#editor-config-properties
            */
            createTitleTextEditor: () => {
                console.log('Editor.js > createTitleTextEditor AAAA');
                note.textSync.createEditor({
                    element: '#titleEditor',
                    docId: `${note.currentNote.Slug}-title`,
                    richText: false,
                    collaboratorBadges: false,
                    defaultText: note.currentNote.Title,
                })
            },

            /**
             * Create the text editor for the main content.
             *
             * @see https://docs.pusher.com/textsync/reference/js#editor-config-properties
             */
            createContentTextEditor: () => {
                console.log('Editor.js > createContentTextEditor AAAA');
                note.textSync.createEditor({
                    element: "#editor",
                    docId: `${note.currentNote.Slug}-content`,
                    onCollaboratorsJoined: users => {
                        for (const key in users) {
                            note.collaborators[users[key].siteId] = users[key]
                        }
                        const count = Object.keys(note.collaborators).length
                        collaboratorsText.text((count > 1 ? `${count} collaborators.` : 'None yet! Send link to your friends to edit along!'))
                    }
                })
            },
        }

        noteDocument.ready(helpers.loadNoteEditors)
    }());