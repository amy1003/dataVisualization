# this py defines functions of logging in,logging out,registeration and other users related

from django.http import HttpResponse
from datetime import datetime
from django.shortcuts import render
from django.shortcuts import render_to_response
from django import forms
from django.contrib import auth
from django.contrib.auth.models import User
from django.db.utils import  IntegrityError
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
import re

CN = {
    'user':'用户名',
    'psw':'密码',
    'repsw':'重复密码',
    'email':'电子邮箱'
}

LNG = CN;

class LoginForm(forms.Form):
    userName = forms.CharField(max_length=15,min_length=6,label=LNG['user'],widget=forms.TextInput(attrs={'class':'form-control'}),
                               error_messages={
                                   'required': u'sadfsadfasdf',
                                   'max_length': u'用户名至少应有6个字符,少于15个字符',
                                   'min_length': u'用户名至少应有6个字符,少于15个字符'
                               })
    password = forms.CharField(min_length=6,max_length=15,label=LNG['psw'],
                               error_messages={
                                   'max_length': u'密码有6位，少于15位',
                                   'min_length': u'密码有6位，少于15位'
                               },widget=forms.TextInput(attrs={'type':'password','class':'form-control'})
                               )


class RegisterForm(forms.Form):
    user = forms.CharField(max_length=15, min_length=6, label=LNG['user'],
                               widget=forms.TextInput(attrs={'class': 'form-control'}),
                               error_messages={
                                   'required': u'sadfsadfasdf',
                                   'max_length': u'用户名至少应有6个字符,少于15个字符',
                                   'min_length': u'用户名至少应有6个字符,少于15个字符'
                               })
    psw = forms.CharField(min_length=6, max_length=15, label=LNG['psw'],
                               error_messages={
                                   'max_length': u'密码有6位，少于15位',
                                   'min_length': u'密码有6位，少于15位'
                               }, widget=forms.TextInput(attrs={'type': 'password', 'class': 'form-control'})
                               )
    re_password = forms.CharField(min_length=6,max_length=15,label=LNG['psw'],
                               error_messages={
                                   'max_length': u'密码有6位，少于15位',
                                   'min_length': u'密码有6位，少于15位'
                               },widget=forms.TextInput(attrs={'type':'password','class':'form-control'})
                               )
    email = forms.CharField(label=LNG['email'],widget=forms.TextInput(attrs={'class':'form-control','type':'email'}))


def login(request):
    print('i m called')
    if request.method != 'POST':
        return render_to_response('403.html')
    else:
        form = LoginForm(request.POST)
        if form.is_valid():
            try:
                formdata = form.cleaned_data
                print(request.POST)
                print(formdata['userName']+' '+formdata['password'])
                user = auth.authenticate(username=formdata['userName'],password=formdata['password'])
                if user is not None:
                    auth.login(request,user)
                    return HttpResponse('ok')
                else:
                    return HttpResponse('用户密码不匹配')
            except Exception as e:
                print(repr(e))
                return HttpResponse('服务器内部错误')
        else:
            str = ''
            for k,v in form.errors:
                str += v

            return HttpResponse(str)


def register(request):
    if request.method != 'POST':
        return render_to_response('403.html')
    else:
        form = RegisterForm(request.POST)
        print(request.POST)
        error = {}
        if form.is_valid():

            formData = form.cleaned_data

            if formData['psw'] != formData['re_password']:
                return HttpResponse('请确保重复密码与原密码一致')
            else:
                try:
                    print(formData)

                    pattern = re.compile(r'^[A-Za-z0-9_]*$')
                    #pattern_email = re.compile('^\\w+([-_.]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,6})+$')

                    if pattern.match(formData['user']) is None:
                        return HttpResponse('用户名只能包括字母与数字')

                    #if pattern_email.match(formData['email']):
                        #return HttpResponse('邮箱格式错误')


                    newuser = User.objects.create_user(
                        username=formData['user'],
                        password=formData['psw'],
                        email=formData['email'])
                    newuser.save()
                    return HttpResponse('ok')

                except Exception as e:
                    if isinstance(e,IntegrityError):
                        return HttpResponse('用户名重复')
                    else:
                        return HttpResponse(repr(e))

        unkownerror = ''
        for k,v in form.errors:
            unkownerror += v

        return HttpResponse(unkownerror)


def logout(request):
    auth.logout(request)
    return HttpResponseRedirect('/index')


@login_required
def resetPsw(request):
    pass


def findPsw(request):
    pass


#bu cun zai de
def sendAEmail(request):
    pass