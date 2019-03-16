Just a misc. way to track stuff I want to do.

* The http cache just arbitrarily caches all data calls for a day since last executed. Should probably make this longer for reports (define via an annotation on the function maybe? If done via an annotation should probably make it an opt in thing.).
* Metrics
  * Show DPS over fight vs comparison group doing the same, to see where your DPS drops vs others (line graph)
  * Show buff alignment over fight vs comparison groups
  * Show raid wide dps contribution over vs vs comparison groups
* Fancy group ng-select that shows more info about each group on hover or something.
* Pin/save certain reports w/ tags and notes
* Comparison groups you create should be taggable
* Make a big boi backend. Saving stuff locally with import/export is okay for my own data for now, but being able to cache results from the other APIs this hits on the server instead of client side should
be prioritized, i'd rather not make them salty and get banned. A temporary solution might be to have the use provide their own API keys for both APIs, but that's a bit disingenuous.
  * In particular users providing their own FFlogs api key might be fine, since it probably lets them access reports that mine won't be able to see?
* If someone goes to /character/id and the id isn't already in their character list, look it up via the
xivapi instead. Also offer to add it to their list in a non intrusive way. Allows people to share URLs 
more effectively than requiring the character to exist on their watchlist like it does now.
* Figure out an effective way to resolve FFlogs characters into lodestone ones. or get the server
 for a FFlogs character. Probably not possible without the user doing things, but being able to would be very useful.
* On table ctrl + c throws exception: https://github.com/ag-grid/ag-grid/issues/2975
