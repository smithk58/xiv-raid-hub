Just a misc. way to track stuff I want to do.

* Dark theme stuff:
  * list-group-item-dark on group items
  * bg-dark and text-white on cards
  * Dark theme for accordion (not built into bootstrap, probably have to utilize bg-dark/text-white)
  * Dark theme for ng-select
  * Dark theme for modals
  * Dark theme for buttons
  * Toggle for dark vs light theme 
* The http cache just arbitrarily caches all data calls for a day since last executed. Should probably make this longer for reports (define via an annotation on the function maybe? If done via an annotation should probably make it an opt in thing.).
* Metrics
  * Show DPS over fight vs comparison group doing the same, to see where your DPS drops vs others (line graph)
  * Show buff alignment over fight vs comparison groups
  * Show raid wide dps contribution over vs vs comparison groups
* Pin/save certain reports w/ tags and notes
* Comparison groups you create should be taggable
* Make a big boi backend. Saving stuff locally with import/export is okay for my own data for now, but being able to cache results from the other APIs this hits on the server instead of client side should
be prioritized, i'd rather not make them salty and get banned. A temporary solution might be to have the use provide their own API keys for both APIs, but that's a bit disingenuous.
  * In particular users providing their own FFlogs api key might be fine, since it probably lets them access reports that mine won't be able to see?
