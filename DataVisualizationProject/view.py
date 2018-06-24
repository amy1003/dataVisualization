from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from DataVisualizationProject.userAdmin import RegisterForm
from django.contrib.auth.decorators import login_required
from datetime import datetime
from DataManager import Api
from MyModel.models import *
from user_agents import parse

Chart = testChart


host = 'http://192.168.43.213:80'

def sendWelcome(request):
    return HttpResponseRedirect('static/welcome.html')



def registerPage(request):
    return render(request, '../backupfile/register.html', {'registerForm':RegisterForm()})


@login_required
def updatePage(request):
    return render_to_response('updateFile.html')

@login_required
def homePage(request):
    print(request.user)
    context = {}
    context['username'] = request.user
    context['pageName'] = '主页面'
    context['host'] = host
    return render(request,'home.html',context)


def testPage(request):
    return render_to_response('reactTest.html');


# 进入editPanel,并为渲染用户的图表做准备
@login_required
def editPanel(request,name):
    try:
        user = User.objects.get(username=request.user)
        chart = Chart.objects.get(user=user,name=name) #是否找得到
        context = {}
        context['username'] = request.user
        context['chartName'] = chart.name
        context['pageName'] = '数据可视化'
        context['host'] = host
        return render(request, 'ChartEdit.html', context);
    except Exception as e:
        print(repr(e))
        return render_to_response('403.html')

@login_required
def toTest(request):
    return render_to_response('test.html')

# 进入数据集管理页面
@login_required
def datasetPage(request):
    context = {}
    context['username'] = request.user
    context['datatime'] = datetime.now()
    context['pageName'] = '数据集合管理'
    context['host'] = host
    return render(request,'dataset.html',context)

@login_required
def applicationsPage(request):
    context = {}
    context['username'] = request.user
    context['pageName'] = '应用管理与组装'
    context['host'] = host
    return render(request,'applications.html',context)


@login_required
def test(request):
    return HttpResponse('you logged in')

@login_required
def editApp(request,appName):
    try:
        user = User.objects.get(username=request.user)
        app = Application.objects.get(user=user, name=appName)  # 是否找得到

        ua = parse(request.META.get('HTTP_USER_AGENT'))

        context = {}
        context['username'] = request.user
        context['appTitle'] = app.name
        context['host'] = host

        if (ua.os.family == 'Windows'):
            context['pageName'] = '编辑应用' + appName
            return render(request, 'editApp.html', context)
        elif (ua.os.family == 'Android' or ua.os.family == 'IOS'):
            return render(request, 'phoneApp.html', context)


    except:
        traceback.print_exc();
        return render_to_response('403.html')

@login_required
def TEST(request):
    try:
        context = {}
        context['username'] = request.user
        context['datatime'] = datetime.now()
        context['appTitle'] = '数据集合管理'
    except:
        traceback.print_exc()

    return render_to_response('拖曳试验场.html')

@login_required
def testPhone(request):
    ua = parse(request.META.get('HTTP_USER_AGENT'))
    context = {}

    if(ua.os.family=='Windows'):
        print('desktop')
    elif(ua.os.family=='Android' or ua.os.family =='IOS'):
        print('hello!')

    context['host'] = host
    return render(request, 'phoneApp.html', context)