import {Component, OnInit, Type} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, Routes} from '@angular/router';
import {filter} from 'rxjs';
import {NgForOf, NgIf} from '@angular/common';
import {right} from '@popperjs/core';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})

export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.breadcrumbs = this.buildBreadcrumbs(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;
        this.breadcrumbs = this.buildBreadcrumbs(url);
      });
  }

  buildBreadcrumbs(url: string): Breadcrumb[] {
    const segments = url.split("?")[0].split('/').filter(Boolean);
    const breadcrumbs: Breadcrumb[] = [];

    let root = this.router.config.find(x => x.path === segments[0]);
    let children = root?.children;

    if (!root || !children) {
      console.warn("Breadcrumbs not found")
      return [];
      //throw new Error("Breadcrumbs not found");
    }

    let bufferRoot = (root as {path: string, data: {breadcrumb: string}});
    breadcrumbs.push({label: bufferRoot.data.breadcrumb, url: "/" + bufferRoot.path});

    let path = "";
    for (const segment of segments.splice(1, segments.length - 1)) {
      path += segment;

      let child = children.find(x =>
          x.path === path || (
            x.path?.includes(':') &&
            x.path.split('/').length === path.split('/').length
          )
      ) as { path: string, data: { breadcrumb: string } };

      if (child?.path.includes(':')) {
        const routeParts = child.path.split('/');
        const pathParts = path.split('/');

        path = routeParts.map((part, i) =>
          part.startsWith(':') ? pathParts[i] : part
        ).join('/');
      }

      if (!child) {
        throw new Error("Breadcrumbs not found");
      }


      try {
        breadcrumbs.push({label: child.data.breadcrumb, url: path});
      }
      catch (e) {
        return []
      }
      //breadcrumbs.push({label: child.data.breadcrumb, url: path});

      path += "/"
    }

    return breadcrumbs;
  }
}
