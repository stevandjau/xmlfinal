$(document).ready(function() {
	var channelName = 'PewDiePie';

	$.get(
		"https://www.googleapis.com/youtube/v3/channels",{
			part: 'contentDetails',
			forUsername: channelName,
			key:'AIzaSyBayiuvPQAq3CCiVstvO1tA52IR4r0VjQc'},
			function(data) {
				$.each(data.items, function(i, item) {
					
					pid = item.contentDetails.relatedPlaylists.uploads;
					getVids(pid);
				})
			}

	);//end get

	function getVids(pid) {
		$.get(
		"https://www.googleapis.com/youtube/v3/playlistItems", {
			part: 'snippet',
			maxResults: 5,
			playlistId: pid,
			key:'AIzaSyBayiuvPQAq3CCiVstvO1tA52IR4r0VjQc'},
			function(data) {
				var output;
				$.each(data.items, function(i, item) {
					title = item.snippet.title;
					vidId = item.snippet.resourceId.videoId;
					imgUrl = item.snippet.thumbnails.default.url;
					console.log(item);
					output = '<div><img src=\"'+imgUrl+'\" /><br/><span>'+title+'</span></div>';
					//you can also embedd video with iframe
					//'<li><iframe src=\"//www.youtube.com/embed/'+vidId+' \"></iframe></li>';
					//append to results
					$('#result').append(output);
				})
			}
		)//end get
	}//end getVids

	function getMovDetail (movid) {
		$.get();
	}
});

