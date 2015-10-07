# ember-select-combo

Pure Ember replacement for chosen and select2. Multiple selection is not currently supported. This is an early prototype and it's not well tested yet. Pull request are welcome.

## Integration to your ember app

* ember install:addon ember-select-combo

## Usage

* Compatible with Ember.Select
* Component name is `select-combo`
* Ember-Data compatible

*example:

    {{select-combo value=userId content=users
            optionValuePath='content.id' 
            optionLabelPath='content.name'}}


## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

MIT licence
