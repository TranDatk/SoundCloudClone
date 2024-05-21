from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *

class UserSerializer(ModelSerializer):
    avatar = serializers.SerializerMethodField(source='avatar')
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password' : {'write_only':'true'}
        }

    def validate(self, data):
        if 'password' not in data or 'username' not in data or data['password'] == '' or data['username'] == '':
            raise serializers.ValidationError("Mật khẩu không được để trống")

        email = data.get('email')
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email đã tồn tại trong hệ thống")

        username = data.get('username')
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError("Tên người dùng đã tồn tại trong hệ thống")
        return data

    def get_avatar(self, user):
        if user.avatar:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri('/static/%s' % user.avatar.name)

            return '/static/%s' % user.avatar.name

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user

class GenreSerializer(ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class TracksSerializer(ModelSerializer):
    fk_user = SerializerMethodField()
    fk_genre = SerializerMethodField()

    class Meta:
        model = Tracks
        fields = '__all__'

    def get_fk_user(self, track):
        user = track.fk_user
        if user:
            return UserSerializer(user).data
        return None

    def get_fk_genre(self, track):
        genre = track.fk_genre
        if genre:
            return GenreSerializer(genre).data
        return None

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Kiểm tra xem có 'request' trong context hay không
        if 'request' in self.context:
            # Xóa domain từ URL hình ảnh
            if 'photo' in representation and representation['photo']:
                representation['photo'] = representation['photo'].replace(
                    self.context['request'].build_absolute_uri('/'), '')
            if 'url' in representation and representation['url']:
                representation['url'] = representation['url'].replace(
                    self.context['request'].build_absolute_uri('/'), '')

        return representation


class PlaylistSerializer(ModelSerializer):
    class Meta:
        model = Playlist
        fields = '__all__'

class PlaylistTracksSerializer(ModelSerializer):
    class Meta:
        model = PlaylistTracks
        fields = '__all__'

class CommentSerializer(ModelSerializer):
    fk_user = SerializerMethodField()

    def get_fk_user(self, comment):
        user = comment.fk_user
        if user:
            return UserSerializer(user).data
        return None

    class Meta:
        model = Comment
        fields = '__all__'

class LikeSerializer(ModelSerializer):
    fk_user = SerializerMethodField()
    fk_tracks = SerializerMethodField()

    def get_fk_user(self, like):
        user = like.fk_user
        if user:
            return UserSerializer(user).data
        return None

    def get_fk_tracks(self, like):
        track = like.fk_tracks
        if track:
            return TracksSerializer(track).data
        return None

    class Meta:
        model = Like
        fields = '__all__'

class FollowerSerializer(ModelSerializer):
    class Meta:
        model = Follower
        fields = '__all__'