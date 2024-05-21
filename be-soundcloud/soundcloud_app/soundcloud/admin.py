from django.contrib import admin
from django.contrib import admin
from django import forms
from django.db.models import Count
from django.template.response import TemplateResponse
from django.utils.html import mark_safe
from django.urls import path
from .models import *
from django.contrib.auth.models import Permission, Group

class TracksAdmin(admin.ModelAdmin):
    list_display = ["id", "title"]
    search_fields = ["id"]
    list_filter = ["id"]

class UserAdmin(admin.ModelAdmin):
    list_display = ["id", "username"]
    search_fields = ["id"]
    list_filter = ["id"]

class GenreAdmin(admin.ModelAdmin):
    list_display = ["id","name"]
    search_fields = ["id"]
    list_filter = ["id"]

class PlaylistAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "fk_user"]
    search_fields = ["id"]
    list_filter = ["id"]

class PlaylistTracksAdmin(admin.ModelAdmin):
    list_display = ["id", "fk_playlist", "fk_tracks"]
    search_fields = ["id"]
    list_filter = ["id"]

class CommentAdmin(admin.ModelAdmin):
    list_display = ["id", "fk_user", "fk_tracks"]
    search_fields = ["id"]
    list_filter = ["id"]

class LikeAdmin(admin.ModelAdmin):
    list_display = ["id", "fk_user", "fk_tracks", "like"]
    search_fields = ["id"]
    list_filter = ["id"]

class FollowerAdmin(admin.ModelAdmin):
    list_display = ["id", "fk_user", "fk_follower"]
    search_fields = ["id"]
    list_filter = ["id"]

class SoundCloudAdminSite(admin.AdminSite):
    site_header = 'SoundCloud'
    index_title = 'Trang web nghe nhạc'


admin_site = SoundCloudAdminSite('soundcloud')

admin_site.register(Tracks,TracksAdmin)
admin_site.register(User,UserAdmin)
admin_site.register(Genre,GenreAdmin)
admin_site.register(Playlist,PlaylistAdmin)
admin_site.register(PlaylistTracks,PlaylistTracksAdmin)
admin_site.register(Comment,CommentAdmin)
admin_site.register(Like,LikeAdmin)
admin_site.register(Follower,FollowerAdmin)

admin_site.register(Permission)
admin_site.register(Group)