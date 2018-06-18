---
layout: default
title: "Blog"
description: "Written articles about the world & development of Avon's Adventure."
permalink: /blog/
---
<header>
  <h1>{{ page.title }}</h1>
  <p>{{ page.description }}</p>
</header>

<div class="container">
  <h2>Categories</h2>
  <div class="row">
    <div class="col m12 l8">
      <div class="row">
      {% for post in site.posts %}
        {% if post.categories contains "blog" and post.categories contains "category" %}
          <div class="col s12 m6">
            <div class="card">
              <a href="{{ post.url | prepend: site.baseurl }}" class="block">
                <div class="card-content center-align">
                  <span class="card-title">
                    <i class="material-icons">{{ post.icon }}</i>
                    <br />
                    {{ post.title }}
                  </span>
                  <p>
                    {% assign post_count = 0 %}
                    {% for subpost in site.posts %}
                      {% if subpost.categories contains post.key %}
                        {% capture post_count %}{{ post_count | plus: 1 }}{% endcapture %}
                      {% endif %}
                    {% endfor %}
                    {{ post_count }}

                    {% if post_count == "1" %}
                      post
                    {% else %}
                      posts
                    {% endif %}
                  </p>
                </div>
              </a>
            </div>
          </div>
        {% endif %}
      {% endfor %}
      </div>
    </div>
    <div class="col m12 l4">
      <div class="card">
        <div class="card-content">
          <span class="card-title">Recent Posts</span>

          {% for post in site.categories.blog limit: 4 %}
            {% if post.key == null %}
              <a href="{{ post.url | prepend: site.baseurl }}" class="sidebar-post">{{ post.title }}</a>
            {% endif %}
          {% endfor %}

          <span class="card-title pushup">Author</span>

          <img src="{{ site.baseurl }}/img/profile.jpg" class="floater left authorpic" alt="Kirk!">

          <p class="clr authorbio">Hey, my name is Kirk and I'm the author of Avon's Adventure. I've been lovingly developing games and software for over 10 years! Enjoy Avon's Adventure :)</p>

          <a class="social-btn" href="//instagram.com/saricden" target="_blank">
            <span class="socicon socicon-instagram"></span>
          </a>
          <a class="social-btn" href="//facebook.com/saricden" target="_blank">
            <span class="socicon socicon-facebook"></span>
          </a>
          <a class="social-btn" href="//twitter.com/saricden" target="_blank">
            <span class="socicon socicon-twitter"></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>