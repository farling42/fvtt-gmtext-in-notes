// Ideally we'd override only Note#text to return GM-notes for Note tooltip, 
// but since that isn't possible we have to override Note#_drawTooltip instead :-(

import {libWrapper} from './libwrapper-shim.js'

const MODULE_NAME = "gmtext-in-notes";
const PIN_GM_TEXT = "gmNote";
const NOTE_FLAG = `flags.${MODULE_NAME}.${PIN_GM_TEXT}`;

/**
 * If the Note has a GM-NOTE on it, then display that as the tooltip instead of the normal text.
 * Foundry V12+
 * @param {function} wrapped The wrapped function provided by libWrapper
 * @returns the label for this NoteDocument
 */
function NoteDocument_label(wrapped) {
	// Only override default if flag(MODULE_NAME,PIN_GM_TEXT) is set
	const gmlabel = this.getFlag(MODULE_NAME, PIN_GM_TEXT);
	return (gmlabel?.length>0) ? gmlabel : wrapped();
}

/**
 * Adds a GM-only string to be displayed on the Note *instead of* the normal note text for the GM,
 * players will see the normal non-GM text.
 * @param {NoteData} [notedata]  The NoteData to which GM-only text is to be added
 * @param {String}   [text]      The text to be stored as the GM-only text for this note
 */
export function setNoteGMtext(notedata,text) {
	// notedata might not exist as a Note, so setFlag is not available
	foundry.utils.setProperty(notedata, NOTE_FLAG, text);
}

Hooks.once('canvasInit', () => {
	// This module is only required for GMs (game.user accessible from 'ready' event but not 'init' event)
	if (game.user.isGM) {
		libWrapper.register(MODULE_NAME, 'CONFIG.Note.documentClass.prototype.label',   NoteDocument_label, libWrapper.MIXED);
		libWrapper.register(MODULE_NAME, 'CONFIG.Note.objectClass.prototype._onUpdate', Note_onUpdate,      libWrapper.WRAPPER);
	}
})

/**
 * Update Note config window with a text box to allow entry of GM-text.
 * Also replace single-line of "Text Label" with a textarea to allow multi-line text.
 * @param {NoteConfig} app    The Application instance being rendered (NoteConfig)
 * @param {HTMLElement} html  The inner HTML of the document that will be displayed and may be modified
 * @param {object] data       The object of data used when rendering the application (from NoteConfig#getData)
 */
async function render_note_config(app, html, data) {
	// Input for GM Label
  const note = data.document;
  let gmtext = note.getFlag(MODULE_NAME, PIN_GM_TEXT);
	if (!gmtext) gmtext = "";

  const flags = new foundry.data.fields.ObjectField({label: "module-flags"}, {parent: data.fields.flags, name: MODULE_NAME});

  const otherfield = app.element.querySelector('div.form-group input[name="fontFamily"]').parentElement.parentElement;
  const fieldset = otherfield.parentElement.parentElement.parentElement;

  // New Field
  const gmtext_input = (new foundry.data.fields.StringField(
    {
      label: "Text Label for GM",
      initial: (note.getFlag(MODULE_NAME, PIN_GM_TEXT) ?? "") },
    { parent: flags, name: PIN_GM_TEXT })).toFormGroup();

  otherfield.parentElement.insertBefore(gmtext_input, otherfield);

  // Replace old label with multi-line label
}

function Note_onUpdate(wrapper, data, options, userId) {
// Foundry V11: Note#_onUpdate needs to set refreshText render flag
	let result = wrapper(data, options, userId);
	if (this.renderFlags && foundry.utils.getProperty(data, NOTE_FLAG)) {
		this.renderFlags.set({refreshText: true})
	}
	return result;
}


Hooks.on("renderNoteConfig", render_note_config);

Hooks.on("init", () => { globalThis.setNoteGMtext = setNoteGMtext })