from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    avatar = models.ImageField(upload_to='uploads/%Y/%m')
    email = models.CharField(max_length=255, null=False, unique=True)
    tel = models.CharField(max_length=255, null=True, unique=True)

class ItemBase(models.Model):
    class Meta:
        abstract = True

    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)


class Tracks(ItemBase):
    class Meta:
        db_table = 'tracks'

    title = models.CharField(max_length=255, null=True, unique=False)
    description =  models.TextField(null=True, blank=True)
    photo = models.ImageField(upload_to='photos/%Y/%m',default=None, blank=True, null=True,)
    like = models.IntegerField(default=0)
    view = models.IntegerField(default=0)
    url = models.FileField(default=None, blank=True, null=True, upload_to='song/%Y/%m')
    fk_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True,
                                     related_name="tracks_user")
    fk_genre = models.ForeignKey('Genre', on_delete=models.SET_NULL, null=True,
                                related_name="tracks_genre")

    def __str__(self):
        return self.title

class Playlist(ItemBase):
    class Meta:
        db_table = 'playlist'

    status = models.BooleanField(null=False, default=False)
    title = models.CharField(max_length=255, null=True, unique=False)
    description =  models.TextField(null=True, blank=True)
    fk_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True,
                                     related_name="playlist_user")

    def __str__(self):
        return self.title

class PlaylistTracks(ItemBase):
    class Meta:
        db_table = 'playlisttracks'

    fk_playlist = models.ForeignKey(Playlist, on_delete=models.SET_NULL, null=True,
                                 related_name="playlisttracks_playlist")
    fk_tracks = models.ForeignKey(Tracks, on_delete=models.SET_NULL, null=True,
                                     related_name="playlisttracks_tracks")

class Comment(ItemBase):
    class Meta:
        db_table = 'comment'

    comment_text = models.TextField(null=True, blank=True)
    moment = models.IntegerField(default= 0)
    fk_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True,
                                     related_name="comment_user")
    fk_tracks = models.ForeignKey(Tracks, on_delete=models.SET_NULL, null=True,
                                 related_name="comment_tracks")

class Like(ItemBase):
    class Meta:
        db_table = 'like'
    like = models.BooleanField(null=False, default=False)
    fk_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True,
                                related_name="like_user")
    fk_tracks = models.ForeignKey(Tracks, on_delete=models.SET_NULL, null=True,
                                  related_name="like_tracks")

class Follower(ItemBase):
    class Meta:
        db_table = 'follower'

    fk_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True,
                                related_name="user")
    fk_follower = models.ForeignKey(User, on_delete=models.SET_NULL, null=True,
                                related_name="follower")

class Genre(ItemBase):
    class Meta:
        db_table = 'genre'

    name = models.CharField(max_length=255, null=True, unique=True)
    description = models.TextField(null=True, blank=True)
