# Introduction

This module provides the ability for Note tooltips to be configured so that GMs see different text to Players.

So secret information can be displayed to GMs whilst players see the "public" information about the Note.

# Usage

The Note Configuration window has two new fields:

**Player Label** replaces the old *Label* field and should be used to contain the text that will be seen by all players.
This replaces the old Label field which only allowed a single line of text to be entered (even though the Note would allow multiple lines of text to be displayed).

**GM Label** will be the text displayed on the Note tooltip for GMs only. If left blank, then the *Player Label* will be displayed to GMs as well.

The default FoundryVTT behaviour on initial Note creation will still work, setting the Player Label to the name of the journal entry.