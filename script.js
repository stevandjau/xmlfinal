$(document).ready(function() {

	//var for 4 best movies id in imdb
	var movieid = [{id:"tt0468569", img:"img/dark-knight.jpg", icon:"img/dklogo.jpg"},
					{id:"tt0120737", img:"img/lotr.jpg", icon:"img/lotrlogo.jpg"},
					{id:"tt1375666", img:"img/inception.jpg", icon:"img/inclogo.jpg"},
					{id:"tt3315342", img:"img/logan.png", icon:"img/loglogo.png"}];

	//getting movies name for main buttons
	$.each(movieid, function (index, value) {
		getMovDetailButton (value.id, value.icon);
	})//end foreach

	//event listener for main button clicks
	$('#button-result').on('click','.main-button',function() {
		getMovDetailCarousel(this.id);
	});

	//event listener for movie detail
	$('#carousel-more').on('click','.more-button',function() {
		displayDetail (this.id);
		//scroll with animation to the description

		$('html, body').animate({
		    scrollTop: $("#detail-result").offset().top
		}, 1000);

	});


	//FUNCTIONS/////////////////////////////////////////////////////////////////////////////

	//function for using imdb movie database api accepting imdb movie id as param and display it in the banner

	function displayDetail (movid) {
		//create var to hold api key and url
		var imdbkey= "b57d904da693355143ffee4b22194b0e";
		var url="https://api.themoviedb.org/3/movie/"+movid;
		//make get request to the api
		$.get(url, {
			api_key:imdbkey
			}, function(data) {
				//display detail
				$("#detail-result").html('');
				$('#review-result').html('');
				$("#detail-result").append(
					"<div><h3>"+data.original_title+"</h3><p><i>"+data.tagline+"</i></p><p>Release date:"+data.release_date+"</p><p>Story Summary: "+data.overview+"</p><p>Website: <a href=\""+data.homepage+"\">"+data.homepage+"</a></p></div>"
				);

				getReview(data.original_title);
			}
		);
	}

	function getMovDetailCarousel (movid) {
		//create var to hold api key and url
		var imdbkey= "b57d904da693355143ffee4b22194b0e";
		var url="https://api.themoviedb.org/3/movie/"+movid;
		
		$.get(url, {
			api_key:imdbkey
			}, function(data) {
				//grab movieid object where id equals to current id
				var movobj = $.grep(movieid, function(e){ return e.id == movid; });
				//set background to carousel
				$('#carousel-result').css('background-image', 'url('+movobj[0].img+')');
				//set movie title and description
				$('#carousel-detail').html('');
				$('#carousel-detail').append(
					"<h1>"+data.original_title+"</h1>"+
					"<p>"+data.overview+"</p>"
				);
				//create a detail button
				$("#carousel-more").html(
					"<div id="+data.imdb_id+" class=\"more-button\" alt=\"show detail\"><span>Detail</span></div>"
				);
				$("#carousel-more").css('outline', '2px #FFF solid');
				$("#carousel-more").css('background', '#f0a30d');
			}
		);
	}

	function getMovDetailButton (movid, movicon) {
		
		$("#button-result").append(
			"<div id=\""+movid+"\" class=\"col-md-3 main-button\" alt=\"movie button\"></div>"
		);
		$("#"+movid).css('background-image', 'url('+movicon+')');
	}

	// api for new york times review 
	function getReview (movname) {
		//getting the param to search the review of specific title
		var url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
			url += '?' + $.param({
			  'api-key': "909213ac81c84943ad029dbbd7ecfc89",
			  'query': "'"+movname+"'"
			});
			$.ajax({
			  url: url,
			  method: 'GET',
			}).done(function(result) {
				$('#review-result').append("<h3>Reviews</h3>");
				console.log(result.results);
				$.each(result.results, function (index, value) {
					console.log(value);
					$('#review-result').append(
						"<div><p><b><a href=\""+value.link.url+"\">"+value.headline+"</a></b></p><p>"+value.summary_short+"</p><p>"+value.byline+", "+value.publication_date+"</p></div>"
					);
				})
			}).fail(function(err) {
			  throw err;
			});
	}

});

