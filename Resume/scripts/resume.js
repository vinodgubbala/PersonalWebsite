
$(function() {
	var _data = data;
	function renderSkills() {
		
		var skillsObj = _data.skills;
		var $skills = $('.skills#skills'),
			$list = $('<ul></ul>');
			$skills.append($list);
		$.each(skillsObj, function(i, skill) {
			var $skill = $('<li></li>');
			$skill.html(skill);
			$list.append($skill);
			//$skills.append($skill);
		});
	}
	
	
	var formatters = {
		'mail': function(obj) {
			return '<a href="mailto:' + obj.value + '">' + obj.value + '</a>';
		},
		'phone': function(obj) {
			
			return '<a href="tel:' + obj.value + '">' + obj.text + '</a>';
		},
		'social': function(obj) {
			var socials = {
					'facebook': {
						url: 'https://www.facebook.com/<url>',
						smallUrl: '<value>'
					},
					'googleplus': {
						url: 'https://plus.google.com/<url>',
						smallUrl: '<value>'
					},
					'twitter': {
						url: 'https://www.twitter.com/<url>',
						smallUrl: '<value>'
					},
					'instagram': {
						url: 'https://www.instagram.com/<url>',
						smallUrl: '<value>'
					},
					'linkedin': {
						url: 'https://in.linkedin.com/<url>',
						smallUrl: 'in/<value>'
					},
					'youtube': {
						url : 'https://www.youtube.com/<url>',
						smallUrl: 'c/<value>'
					},
					'stackoverflow': {
						url: 'http://stackoverflow.com/<url>',
						smallUrl: 'users/<value>'
					},
					default: {
						url: '#'
					}
				},
				socialObj = (socials[obj.type] || socials['default']),
				url = socialObj.url,
				smallUrl = socialObj.smallUrl || '';
			smallUrl = smallUrl.replace('<value>', obj.value );
			url = url.replace('<url>', smallUrl );
			
			return '<a target="_blank" href="' + url +'" class="social-' + obj.type + '" print-url="/' + smallUrl + '"></a>';
		},
		'default': function(obj) {		
			
			return obj.text;
		}
	};
	function renderContact() {
		var objArray = _data.contacts,
			$container = $('.contact#contact'),
			$list = $('<ul></ul>');
			$container.append($list);
		$.each(objArray, function(i, obj) {
			var $el = $('<li></li>');
			$el.html((formatters[obj.type] || formatters['default'])(obj));
			$el.addClass('li-' + obj.type);
			$list.append($el);
		});
	}
	
	function renderDate() {
		var currentDate = new Date(),
			$container = $('.date#date');
		$container.html(dateFormat(currentDate, "d mmm, yyyy"));	
		
	}
	
	function renderTitle() {
		var $container = $('h1#title');
		$container.html(_data.name);
	}
	
	function renderProfile() {
		var objArray = _data.profile,
			$container = $('.profile#profile-details'),
			$list = $('<ul></ul>');
		
		$container.append($list);
		$.each(objArray, function(i, obj) {
			var $el = $('<li></li>');
			$el.html(obj);
			$list.append($el);
		});
	}
	
	function renderExperience() {
		var objArray = _data.experience,
			$container = $('.experience#experience-details');
		renderDetails(objArray, $container);
	}
	
	function renderEducation() {
		var objArray = _data.education,
			$container = $('.education#education-details');
		renderDetails(objArray, $container);
	}
	function renderAwards() {
		var objArray = _data.awards,
			$container = $('.awards#awards-details');
		renderDetails(objArray, $container);
	}
	function renderDetails(objArray, $container, args) {
		var $list = $('<ul></ul>');
		$container = $($container);
		args = args || {};
		
		$container.append($list);
		$.each(objArray, function(i, obj) {
			var $elContainer = $('<li></li>'),
				$el,
				$el2,
				$el3,
				$description;
			
			//title
			$el = $('<h3></h3>');
			$el.html(obj.title);
			$elContainer.append($el);
			
			//caption
			if (obj.caption) {				
				$el2 = $('<span></span>');
				$el2.html((args.captionDelimiter || '||') + ' ' + obj.caption);
				$el.append($el2);
				$el2.addClass('caption');
			}
			
			//sub title
			if (obj.subTitle) {
				$el = $('<h7></h7>');
				$el.html(obj.subTitle);
				$elContainer.append($el);
			}
			
			//description
			$description = $('<div class="description"></div>');
			$description.html(obj.description || '');
			
			$.each(obj.list, function(i, listObj) {
				$el2 = $('<div class="row"></div>');
				
				$el3 = $('<span class="title"></span>');
				$el3.html(listObj.title);
				$el2.append($el3);
				
				
				$el3 = $('<span class="detail"></span>');
				
				if (!$.isArray(listObj.description)) {
					listObj.description = [listObj.description];
				}
				var $item;
				$.each(listObj.description, function(i, str) {
					$item = $('<span class="item"></span');
					$item.html(str);
					$el3.append($item);
				});
				
				$el2.append($el3);
				
				$description.append($el2);
			});
			
			
			
			$elContainer.append($description);
			
			
			
			//$el.html(obj);
			$list.append($elContainer);
		});
	}
	
	function renderSocial() {
		
		var objArray = _data.social,
			$container = $('.social#social'),
			$list = $('<ul></ul>');
			$container.append($list);
		$.each(objArray, function(i, obj) {
			var $el = $('<li></li>');
			$el.html(formatters.social(obj));
			$el.addClass('li-' + obj.type);
			$el.attr('value', obj.value);
			$el.attr('print-url', '/' + obj.value);
			$list.append($el);
		});
	}
	
	
	
	
	renderSkills();
	renderContact();
	renderDate();
	renderTitle();
	
	renderProfile();
	
	renderExperience();
	
	renderEducation();
	
	renderSocial();
	
	renderAwards();
	
});