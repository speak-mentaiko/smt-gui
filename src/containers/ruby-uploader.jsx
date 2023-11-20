import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {projectTitleInitialState} from '../reducers/project-title';
import RubyGenerator from '../lib/ruby-generator';
import VM from 'scratch-vm';
import {rubyCodeShape} from '../reducers/ruby-code';

class RubyUploader extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['uploadProject']);
    }

    uploadProject () {
        const idToTarget = {};
        this.props.vm.runtime.targets.forEach(target => {
            idToTarget[target.id] = target;
        });
        const targets = [idToTarget[this.props.stage.id]];
        for (const id in this.props.sprites) {
            const sprite = this.props.sprites[id];
            targets[sprite.order + 1] = idToTarget[id];
        }
        const options = {
            requires: [],
            withSpriteNew: false
        };
        if (this.props.rubyCode.modified) {
            options.targetsCode = {
                [this.props.rubyCode.target.id]: this.props.rubyCode.code
            };
        }
        // master 部分のみ抽出
        const targets1 = targets.splice(1, 1);
        const masterCode = RubyGenerator.targetsToCode(targets1, options);
        // master部分を削除してslaveのコードを生成
        // targets.splice(1, 1);
        const targets2 = targets.splice(1, 2);
        const slaveCode = RubyGenerator.targetsToCode(targets2, options);

        // 確認
        // lintでconsoleを禁止しているのでとりあえずコメントアウト
        // console.log("master: " + masterCode);
        // console.log("slave:  " + slaveCode );

        // 送信
        const ele = document.createElement('form');
        ele.action = 'https://www.epi.it.matsue-ct.jp/j1819/convert/upload.php';
        ele.method = 'post';
        ele.setAttribute('target', '_blank');

        const q = document.createElement('textarea');
        q.value = masterCode;
        q.name = 'master_code';

        const r = document.createElement('textarea');
        r.value = slaveCode;
        r.name = 'slave_code';

        ele.appendChild(q);
        ele.appendChild(r);
        document.body.appendChild(ele);

        ele.submit();
        ele.remove();

        return;
    }

    render () {
        const {children} = this.props;
        return children(this.props.className, this.downloadProject, this.uploadProject);
    }
}

const getProjectFilename = (curTitle, defaultTitle) => {
    let filenameTitle = curTitle;
    if (!filenameTitle || filenameTitle.length === 0) {
        filenameTitle = defaultTitle;
    }
    return `${filenameTitle.substring(0, 100)}.rb`;
};

RubyUploader.propTypes = {
    children: PropTypes.func,
    className: PropTypes.string,
    // never used
    // onSaveFinished: PropTypes.func,
    // projectFilename: PropTypes.string,
    rubyCode: rubyCodeShape,
    sprites: PropTypes.objectOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            order: PropTypes.number.isRequired
        })
    ),
    stage: PropTypes.shape({
        id: PropTypes.string
    }),
    vm: PropTypes.instanceOf(VM)
};
RubyUploader.defaultProps = {
    className: ''
};

const mapStateToProps = state => ({
    projectFilename: getProjectFilename(
        state.scratchGui.projectTitle,
        projectTitleInitialState
    ),
    sprites: state.scratchGui.targets.sprites,
    stage: state.scratchGui.targets.stage,
    vm: state.scratchGui.vm,
    rubyCode: state.scratchGui.rubyCode
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(RubyUploader);
