<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<title>{{ config('app.name') }}</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">	
	<link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body class="bg-slate-100 h-screen w-screen">
  <div id="app" class="h-screen w-screen" data-user="{{ $user }}"></div>
  <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>

