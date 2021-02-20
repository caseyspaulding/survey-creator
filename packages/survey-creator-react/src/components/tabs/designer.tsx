import React from "react";
import * as Survey from "survey-react";
import { Base, ReactElementFactory, SurveyElementBase } from "survey-react";
import { CreatorBase, TabDesignerViewModel } from "@survey/creator";
import { CreatorSurveyPageComponent } from "../page";
import { SurveyCreatorToolbox } from "../toolbox/Toolbox";
import { SurveyPageNavigator } from "../page-navigator/PageNavigator";

interface ITabDesignerComponentProps {
  creator: CreatorBase<Survey.Model>;
  survey: Survey.Model;
}

export class TabDesignerComponent extends SurveyElementBase<
  ITabDesignerComponentProps,
  any
> {
  private model: TabDesignerViewModel<CreatorBase<Survey.Model>>;
  constructor(props: ITabDesignerComponentProps) {
    super(props);
    this.model = new TabDesignerViewModel<CreatorBase<Survey.Model>>(
      props.creator as any
    );
  }

  protected getStateElement(): Base {
    return (this.props.creator as any) as Base;
  }

  render(): JSX.Element {
    const creator: CreatorBase<Survey.Model> = this.props.creator;
    const survey: Survey.Model = this.props.survey;
    const className = "svc-tab-designer " + survey.css.root;

    const surveyPages = survey.pages.map((page, index) => {
      return (
        <CreatorSurveyPageComponent
          key={page.id}
          survey={survey}
          page={page}
          creator={creator}
        ></CreatorSurveyPageComponent>
      );
    });

    surveyPages.push(
      <CreatorSurveyPageComponent
        key={this.model.newPage.id}
        survey={survey}
        page={this.model.newPage as any}
        creator={creator}
      ></CreatorSurveyPageComponent>
    );

    return (
      <>
        <SurveyCreatorToolbox
          categories={creator.toolboxCategories}
          creator={creator}
          items={creator.toolbox.items}
        ></SurveyCreatorToolbox>
        <div className={className}>
          <div className={survey.css.container}>{surveyPages}</div>
        </div>
        <SurveyPageNavigator
          creator={creator}
          pages={creator.pagesController.pages as any}
        ></SurveyPageNavigator>
      </>
    );
    /*
        <svc-toolbox
        params="categories: creator.toolboxCategories, creator: creator"
        ></svc-toolbox>
        <div class="svc-tab-designer" data-bind="css: survey.css.root">
            <div data-bind="css: survey.css.container">
                <!-- ko foreach: survey.pages -->
                <svc-page
                params="survey: $parent.survey, page: $data, creator: $parent.creator"
                ></svc-page>
                <!-- /ko -->
                <!-- ko if: showNewPage -->
                <svc-page
                params="survey: survey, creator: creator, page: newPage"
                ></svc-page>
                <!-- /ko -->
            </div>
        </div>
        <svc-page-navigator
        params="items: survey.pages, creator: creator, onSelect: creator.selectElement.bind(creator), selection: function () { return creator.currentPage; }"
        ></svc-page-navigator>
       */
  }
}

ReactElementFactory.Instance.registerElement("svc-tab-designer", (props) => {
  return React.createElement(
    TabDesignerComponent,
    (props as any) as ITabDesignerComponentProps
  );
});
